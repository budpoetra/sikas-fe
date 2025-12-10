import { ProductEntry } from "../../services/reportService";
import DatePicker from "../form/date-picker";
import Form from "../form/Form";
import Button from "../ui/button/Button";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

interface TransactionTableProps {
    productEntries: ProductEntry[] | null;
    setStartDate?: (date: Date | null) => void;
    setEndDate?: (date: Date | null) => void;
    onSearch?: () => void;
}

export default function ProductEntryTable({ productEntries = [], setStartDate, setEndDate, onSearch }: TransactionTableProps) {

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (onSearch) {
            onSearch();
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col lg:flex-row lg:space-x-4 w-full">
                    <div className="flex-1 mb-4 lg:mb-0">
                        <DatePicker
                            id="start-date-picker"
                            label="Select Start Date"
                            placeholder="Select a date"
                            onChange={setStartDate ? (dates) => setStartDate(dates[0] || null) : undefined}
                        />
                    </div>
                    <div className="flex-1 mb-4 lg:mb-0">
                        <DatePicker
                            id="end-date-picker"
                            label="Select End Date"
                            placeholder="Select a date"
                            onChange={setEndDate ? (dates) => setEndDate(dates[0] || null) : undefined}
                        />
                    </div>
                    <div className="flex-1 mb-4 lg:mb-0">
                        <Button
                            variant="primary"
                            className="mt-6"
                        >
                            Search
                        </Button>
                    </div>
                </div>
            </Form>

            <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="w-full overflow-x-auto">
                    <Table className="w-full">
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    #
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Created Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Product Name
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Quantity
                                </TableCell>
                                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                    Created Date
                                </TableCell>
                            </TableRow>
                        </TableHeader>

                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {productEntries?.map((productEntry, index) => (
                                <TableRow key={productEntry.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {productEntry.createdName}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {productEntry.productName}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {productEntry.qty}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {new Date(productEntry.createdDate).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric"
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(!productEntries || productEntries.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={5} className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        No product entries found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}
