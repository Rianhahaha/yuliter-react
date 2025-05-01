type Props = {
    question: {
      id: string;
      question: string;
      options: string[];
    };
    index: number;
    total: number;
    onAnswer: (value: number) => void;
  };
  
  export default function QuestionCard({ question, index, total, onAnswer }: Props) {
    return (
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-semibold">
          Soal {index + 1} dari {total}
        </h2>
        <p className="text-gray-800">{question.question}</p>
        <div className="grid gap-2">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => onAnswer(i + 1)} // nilai 1-5
              className="px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded text-left"
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }
  