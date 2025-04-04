import { useSearchParams } from 'react-router';
import PageHeader from '@/components/texts/page-header';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PermissionsTab from './_tabs/permissions/permissions-tab';
import RolesTab from './_tabs/roles/roles-tab';
import UserRolesTab from './_tabs/user-roles/user-roles-tab';

const RbacPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'user-roles';

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <>
      <div className="mb-3">
        <PageHeader>Roles</PageHeader>
      </div>

      {/* card tabs - example */}
      <Tabs defaultValue={currentTab} onValueChange={handleTabChange}>
        <Card>
          <TabsList variant="outline">
            <TabsTrigger value="user-roles">User Roles</TabsTrigger>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
          </TabsList>
          <TabsContent value="user-roles">
            <UserRolesTab />
          </TabsContent>
          <TabsContent value="roles">
            <RolesTab />
          </TabsContent>
          <TabsContent value="permissions">
            <PermissionsTab />
          </TabsContent>
        </Card>
      </Tabs>
    </>
  );
};

export default RbacPage;
