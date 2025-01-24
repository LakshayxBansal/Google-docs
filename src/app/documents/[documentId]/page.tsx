import { Editor } from "./editor";
import ToolBar from "./toolBar";

interface DocumentIdPageParams {
    params: Promise<{ documentId: string }>
}

const DocumentIdPage = async ({params}:DocumentIdPageParams) => {
    const {documentId} = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <ToolBar />
      <Editor />
    </div>
  )
}

export default DocumentIdPage;