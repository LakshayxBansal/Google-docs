import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numsItems: number) => void;
    status: PaginationStatus
}

import {
    Table , 
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { FullScreenLoader } from "@/components/full-screen-loader";
import { DocumentRow } from "./document-row";
import { Button } from "@/components/ui/button";

export const DocumentsTable = ({
    documents,
    loadMore,
    status,
} : DocumentsTableProps) => {
    return (
        <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
            {documents === undefined ? (
                <div className="flex justify-center items-center h-screen">
                    <FullScreenLoader label="Loading documents..." />
                </div>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead>Name</TableHead>
                            <TableHead >&nbsp;</TableHead>
                            <TableHead className="hidden md:table-cell"> Shared </TableHead>
                            <TableHead className="hidden md:table-cell"> Created at</TableHead>
                        </TableRow>
                    </TableHeader>
                    {documents.length === 0 ? (
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                    No documents found
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        <TableBody>
                            {documents.map((document) => (
                                <DocumentRow key={document._id} document={document} />
                            ))}
                        </TableBody>
                    )}
                </Table>
            )}
            <div className="flex justify-center items-center">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => loadMore(5)}
                    disabled={status !== "CanLoadMore"}
                >
                    {status === "CanLoadMore" ? "Load more" : "End of documents"}
                </Button>
            </div>
        </div>
    )
}