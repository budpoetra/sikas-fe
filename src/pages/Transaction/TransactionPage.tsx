import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import GridTransaction from "../../components/Transaction/GridTransaction";

export default function TransactionPage() {
  return (
    <div>
      <PageMeta
        title="SIKAS - Transaction Page"
        description="SIKAS - Transaction Management Page"
      />
      <PageBreadcrumb pageTitle="Transaction" />
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          <GridTransaction />
        </div>
      </div>
    </div>
  );
}
