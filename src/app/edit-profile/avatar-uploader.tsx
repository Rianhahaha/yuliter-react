'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function AvatarUploader({ userId }: { userId: string }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

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
    const filePath = fileName;

    // Upload ke Supabase Storage (upsert true akan replace jika file sudah ada)
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

    // Update avatar_url di tabel profiles
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', userId);

    if (updateError) {
      console.error('Update profile error:', updateError.message);
    } else {
      alert('Foto profil berhasil diperbarui!');
    }

    setUploading(false);
  };

  const deleteAvatar = async () => {
    setDeleting(true);

    const { error: profileError, data } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', userId)
      .single();

    if (profileError || !data?.avatar_url) {
      alert('Gagal mengambil avatar_url.');
      setDeleting(false);
      return;
    }

    const filePath = data.avatar_url.split('/').pop(); // nama file dari URL

    // Hapus dari storage
    const { error: deleteError } = await supabase.storage
      .from('avatars')
      .remove([filePath]);

    if (deleteError) {
      console.error('Delete error:', deleteError.message);
    }

    // Kosongkan avatar_url di profile
    const { error: clearError } = await supabase
      .from('profiles')
      .update({ avatar_url: null })
      .eq('id', userId);

    if (clearError) {
      console.error('Clear profile error:', clearError.message);
    } else {
      alert('Foto profil berhasil dihapus.');
    }

    setDeleting(false);
  };

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <div className="flex gap-2">
        <button
          onClick={uploadAvatar}
          disabled={uploading || !file}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload Avatar'}
        </button>
        <button
          onClick={deleteAvatar}
          disabled={deleting}
          className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {deleting ? 'Deleting...' : 'Hapus Avatar'}
        </button>
      </div>
    </div>
  );
}
