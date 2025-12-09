import { Category } from "../../services/reportService";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "../ui/table";

interface Props {
    categories?: Category[];
}

export default function CategoryTable({ categories = [] }: Props) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="w-full overflow-x-auto">
                <Table className="w-full">
                    <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                #
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Category
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Total
                            </TableCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {categories.map((category, index) => (
                            <TableRow key={category.id}>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {index + 1}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {category.name}
                                </TableCell>
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    {category.totalPrice}
                                </TableCell>
                            </TableRow>
                        ))}
                        {categories.length === 0 && (
                            <TableRow>
                                <TableCell className="px-4 py-3 text-center text-gray-400 dark:text-gray-500">
                                    No categories available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
