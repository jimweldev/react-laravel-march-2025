import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CardTabsPage = () => {
  return (
    <>
      {/* card tabs - example */}
      <Tabs defaultValue="account">
        <Card>
          <TabsList variant="outline">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">account</TabsContent>
          <TabsContent value="password">password</TabsContent>
        </Card>
      </Tabs>
    </>
  );
};

export default CardTabsPage;
