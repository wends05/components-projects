import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useDeleteApplicant from "@/hooks/useDeleteApplicant";
import Applicant from "@/types/Applicant";
import { Trash } from "lucide-react";



const ApplicantDeleteButton = (applicant: Applicant) => {
  const {mutate} = useDeleteApplicant();

  const handleDelete = () => {
    mutate(applicant);
  };

  return (
    <Drawer direction="left">
      <DrawerTrigger>
        <Trash />
      </DrawerTrigger>

      <DrawerContent className="p-10">
        <div>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <p>
            If you delete this applicant, all of its data will be permanently
            removed from our database forever. This action cannot be undone.
          </p>
        </div>
        <DrawerFooter>
          <button onClick={handleDelete}>Delete</button>
          <DrawerClose>Cancel</DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplicantDeleteButton;
