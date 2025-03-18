import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import PageHeader from '@/components/texts/page-header';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ActiveUsersTab from './_tabs/active-users/active-users-tab';
import ArchivedUsersTab from './_tabs/archived-users/archived-users-tab';

const UsersPage = () => {
  const { userTab } = useParams();
  const navigate = useNavigate();
  const currentTab = userTab || 'active-users';
  const [tab, setTab] = useState(currentTab);

  useEffect(() => {
    if (tab !== currentTab) navigate(`/admin/users/${tab}`);
  }, [tab, currentTab, navigate]);

  const handleTabChange = (value: string) => setTab(value);

  return (
    <>
      <Tabs value={tab} onValueChange={handleTabChange}>
        <div className="mb-3 flex items-center justify-between">
          <PageHeader>Users</PageHeader>

          {/* tabs */}
          <TabsList size="sm">
            <TabsTrigger value="active-users">Active Users</TabsTrigger>
            <TabsTrigger value="archived-users">Archived Users</TabsTrigger>
          </TabsList>
        </div>

        {/* tabs content here */}
        <Card>
          <TabsContent value="active-users">
            <ActiveUsersTab />
          </TabsContent>
          <TabsContent value="archived-users">
            <ArchivedUsersTab />
          </TabsContent>
        </Card>
      </Tabs>
    </>
  );
};

export default UsersPage;
