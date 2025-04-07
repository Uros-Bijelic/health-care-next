import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const AddVisitDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-auto">Create Visit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cretae new patient visit</DialogTitle>
          <DialogDescription>Fill in the form to create a new visit</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button type="button">Close</Button>
          </DialogClose>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddVisitDialog;
