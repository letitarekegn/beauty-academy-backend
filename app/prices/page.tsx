import { PriceTable } from '@/components/prices/price-table';

export default function PricesPage() {
  return (
    <main className="md:ml-64 pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Course Pricing</h1>
          <p className="text-muted-foreground">
            Set prices per course. Changing a price only affects new students — students already registered keep the price they were charged at signup.
          </p>
        </div>

        {/* Table */}
        <PriceTable />
      </div>
    </main>
  );
}
