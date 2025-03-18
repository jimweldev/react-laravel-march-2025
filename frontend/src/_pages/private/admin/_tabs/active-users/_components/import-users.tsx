import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import FileDropzone from '@/components/file-dropzones/file-dropzone';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormItem, FormLabel } from '@/components/ui/form';
import { mainInstance } from '@/instances/main-instance';
import { generateExcel } from '@/lib/generate-excel';

type ImportUsersProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
};

const ImportUsers = ({ open, setOpen, refetch }: ImportUsersProps) => {
  const form = useForm();

  const [isLoadingImportItems, setIsLoadingImportItems] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = () => {
    if (!file) {
      toast.error('Please select a file to import.');
      return;
    }

    setIsLoadingImportItems(true);

    // Read the Excel file
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Parse the worksheet to JSON
      const worksheetData = XLSX.utils.sheet_to_json(worksheet);

      const payload = {
        data: worksheetData,
      };

      toast.promise(mainInstance.post(`/api/users/import`, payload), {
        loading: 'Loading...',
        success: () => {
          refetch();
          setFile(null);
          return 'Users imported successfully';
        },
        error: error => {
          return (
            error.response?.data?.message ||
            error.message ||
            'An error occurred'
          );
        },
        finally: () => {
          setIsLoadingImportItems(false);
        },
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const handleGenerateImportUsersTemplate = () => {
    const headers = [
      'Email',
      'First Name',
      'Middle Name',
      'Last Name',
      'Suffix',
    ];

    generateExcel(headers, 'Import Users Template');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Import Users</DialogTitle>
              <DialogDescription>
                Upload a file to import multiple users into the system.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <FormItem>
                <FormLabel>File</FormLabel>
                <FileDropzone
                  accept={{
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                      [],
                  }}
                  onFileChange={newFiles => setFile(newFiles[0] || null)}
                />
                <div className="flex justify-end">
                  <Button
                    className="px-0"
                    variant="link"
                    size="sm"
                    type="button"
                    onClick={handleGenerateImportUsersTemplate}
                  >
                    Download Template
                  </Button>
                </div>
              </FormItem>
            </DialogBody>
            <DialogFooter className="flex justify-end gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button type="submit" disabled={isLoadingImportItems}>
                Import
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ImportUsers;
