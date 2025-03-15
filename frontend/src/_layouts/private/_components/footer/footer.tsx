import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <div className="bg-card text-muted-foreground mt-auto flex items-center justify-between gap-4 border-t p-2 text-center">
      <p className="text-sm">
        {import.meta.env.VITE_APP_NAME} &copy; {new Date().getFullYear()}
      </p>

      <div className="flex items-center gap-2">
        <Button variant="link" size="sm">
          Support
        </Button>
        <Button variant="link" size="sm">
          Help Center
        </Button>
      </div>
    </div>
  );
};

export default Footer;
