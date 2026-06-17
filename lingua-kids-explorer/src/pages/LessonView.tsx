import { useParams } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function LessonView() {
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <h1 className="text-3xl font-bold mb-4">Lesson {id}</h1>
        <p className="text-gray-400 mb-6">Interactive content goes here...</p>
        <div className="flex justify-between">
          <Button variant="secondary">Back</Button>
          <Button>Check Answer</Button>
        </div>
      </Card>
    </div>
  );
}
