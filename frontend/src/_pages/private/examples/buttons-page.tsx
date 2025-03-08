import HorizontalScrollbar from '@/components/scrollbars/horizontal-scrollbar';
import { Button } from '@/components/ui/button';

const ButtonsPage = () => {
  return (
    // <ScrollArea>
    <HorizontalScrollbar>
      <div className="space-y-4">
        {/* large buttons - examples */}
        <div className="flex gap-2">
          <Button size="lg">Primary</Button>
          <Button size="lg" variant="secondary">
            Secondary
          </Button>
          <Button size="lg" variant="destructive">
            Destructive
          </Button>
          <Button size="lg" variant="success">
            Success
          </Button>
          <Button size="lg" variant="warning">
            Warning
          </Button>
          <Button size="lg" variant="info">
            Info
          </Button>
          <Button size="lg" variant="outline">
            Outline
          </Button>
          <Button size="lg" variant="ghost">
            Ghost
          </Button>
          <Button size="lg" variant="link">
            Link
          </Button>
        </div>

        {/* default buttons - examples */}
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

        {/* small buttons - examples */}
        <div className="flex gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="destructive">
            Destructive
          </Button>
          <Button size="sm" variant="success">
            Success
          </Button>
          <Button size="sm" variant="warning">
            Warning
          </Button>
          <Button size="sm" variant="info">
            Info
          </Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
          <Button size="sm" variant="ghost">
            Ghost
          </Button>
          <Button size="sm" variant="link">
            Link
          </Button>
        </div>

        {/* extra small buttons - examples */}
        <div className="flex gap-2">
          <Button size="xs">Primary</Button>
          <Button size="xs" variant="secondary">
            Secondary
          </Button>
          <Button size="xs" variant="destructive">
            Destructive
          </Button>
          <Button size="xs" variant="success">
            Success
          </Button>
          <Button size="xs" variant="warning">
            Warning
          </Button>
          <Button size="xs" variant="info">
            Info
          </Button>
          <Button size="xs" variant="outline">
            Outline
          </Button>
          <Button size="xs" variant="ghost">
            Ghost
          </Button>
          <Button size="xs" variant="link">
            Link
          </Button>
        </div>
      </div>
    </HorizontalScrollbar>
  );
};

export default ButtonsPage;
