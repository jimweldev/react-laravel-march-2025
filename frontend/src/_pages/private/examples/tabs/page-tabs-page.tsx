import PageHeader from '@/components/texts/page-header';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PageTabsPage = () => {
  return (
    <>
      {/* page tabs - example */}
      <Tabs defaultValue="account">
        <div className="mb-3 flex items-center justify-between">
          <PageHeader>Page Tabs</PageHeader>

          <TabsList size="sm">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
        </div>

        {/* tabs content here */}
        <Card>
          <TabsContent value="account">account</TabsContent>
          <TabsContent value="password">password</TabsContent>
        </Card>
      </Tabs>
    </>
  );
};

export default PageTabsPage;
