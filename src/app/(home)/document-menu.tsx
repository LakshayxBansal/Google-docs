import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, FilePenIcon, MoreVertical, Trash2Icon } from "lucide-react"
import { Id } from "../../../convex/_generated/dataModel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RemoveDocumentDialog } from "@/components/remove-dialog";
import { RenameDocumentDialog } from "@/components/rename-dialog";

interface DocumentsMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: Id<"documents">) => void;
}

export const DocumentsMenu = ({documentId , onNewTab}:DocumentsMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size="icon" className="hover:bg-slate-100   rounded-full">
                    <MoreVertical className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RenameDocumentDialog documentId={documentId}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
                        <FilePenIcon className="size-4 mr-2" />
                        Rename
                    </DropdownMenuItem>
                </RenameDocumentDialog>
                <RemoveDocumentDialog documentId={documentId}>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>
                        <Trash2Icon className="size-4 mr-2" />
                        Delete
                    </DropdownMenuItem>
                </RemoveDocumentDialog>
                <DropdownMenuItem
                    onClick={() => onNewTab(documentId)}
                >
                    <ExternalLinkIcon className="size-4 mr-2" />
                    Open in new tab
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        
    )
}