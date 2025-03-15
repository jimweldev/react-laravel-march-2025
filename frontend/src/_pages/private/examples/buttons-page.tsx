import { Fa0 } from 'react-icons/fa6';
import HorizontalScrollbar from '@/components/scrollbars/horizontal-scrollbar';
import { Button } from '@/components/ui/button';

const ButtonsPage = () => {
  return (
    // <ScrollArea>
    <HorizontalScrollbar>
      <div className="space-y-4">
        {/* variants - examples */}
        <div>
          <h3 className="text-sm font-semibold">Variants</h3>
          <div className="flex gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="info">Info</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* sizes - examples */}
        <div>
          <h3 className="text-sm font-semibold">Sizes</h3>
          <div className="flex gap-2">
            <Button size="lg">Large</Button>
            <Button size="default">Default</Button>
            <Button size="icon">
              <Fa0 />
            </Button>
            <Button size="sm">Small</Button>
            <Button size="xs">
              <Fa0 />
            </Button>
          </div>
        </div>
      </div>
    </HorizontalScrollbar>
  );
};

export default ButtonsPage;
