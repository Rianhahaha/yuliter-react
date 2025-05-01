'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function AvatarUploader({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadAvatar = async () => {
    if (!file || !userId) return;
    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload ke Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('Upload error:', uploadError.message);
      setUploading(false);
      return;
    }

    // Ambil public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('avatars').getPublicUrl(filePath);

    // Update avatar_url ke tabel profiles
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId); // atau pakai auth.user.id jika id = user id

    if (updateError) {
      console.error('Update profile error:', updateError.message);
    } else {
      alert('Avatar updated!');
    }

    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        onClick={uploadAvatar}
        disabled={uploading || !file}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {uploading ? 'Uploading...' : 'Upload Avatar'}
      </button>
    </div>
  );
}
