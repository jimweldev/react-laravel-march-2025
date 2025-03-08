import { Input } from '@/components/ui/input';

const InputsPage = () => {
  return (
    <div className="space-y-4">
      {/* large input - example */}
      <Input inputSize="lg" />

      {/* medium input - example */}
      <Input />

      {/* small input - example */}
      <Input inputSize="sm" />

      {/* extra small input - example */}
      <Input inputSize="xs" />
    </div>
  );
};

export default InputsPage;
