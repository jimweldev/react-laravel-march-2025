import PageHeader from '@/components/texts/page-header';
import AccountTypesChart from './_components/account-types-chart';
import AdminChart from './_components/admin-chart';

const DashboardPage = () => {
  return (
    <>
      {/* Header Section */}
      <div className="mb-3 flex items-center justify-between">
        <PageHeader>Dashboard</PageHeader>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <AdminChart />
        <AccountTypesChart />
      </div>
    </>
  );
};

export default DashboardPage;
