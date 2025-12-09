import { Summary } from "../../services/reportService";
import DatePicker from "../form/date-picker";
import Form from "../form/Form";
import Button from "../ui/button/Button";
import {
    TableCell,
    TableRow,
} from "../ui/table";

interface SummaryTableProps {
    summary: Summary | null;
    setStartDate?: (date: Date | null) => void;
    setEndDate?: (date: Date | null) => void;
    onSearch?: () => void;
}

export default function SummaryTable({ summary, setStartDate, setEndDate, onSearch }: SummaryTableProps) {

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
            <table className="table-auto inline-table">
                <tbody>
                    <TableRow>
                        <TableCell className="px-4 py-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            Date
                        </TableCell>
                        <TableCell className="px-4 py-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            : {summary ? summary.date : "-"}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="px-4 py-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            Total
                        </TableCell>
                        <TableCell className="px-4 py-2 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            : Rp {summary ? summary.total.toLocaleString() : "-"}
                        </TableCell>
                    </TableRow>
                </tbody>
            </table>
        </>
    );
}
