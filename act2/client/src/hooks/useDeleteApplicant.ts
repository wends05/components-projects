import { useMutation, useQueryClient } from "@tanstack/react-query";
import Applicant from "../types/Applicant";
import fetchData from "../utils/fetchData";
import { toast } from "sonner";
import { URL } from "@/utils/constants";

const useDeleteApplicant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Applicant) => {
      toast.message("Deleting applicant...");
      return fetchData<Applicant>({
        url: `${URL}/applicant/${data.id}`,
        method: "DELETE",
      });
    },
    onSuccess: (deletedApplicant) => {
      queryClient.invalidateQueries({
        queryKey: ["applicants"],
      });

      toast.success(
        `Applicant deleted successfully: ${deletedApplicant?.firstName} ${deletedApplicant?.lastName}`,
      );
    },
    onError: (error) => {
      toast.error("Error deleting applicant:" + error.message);
    },
  });
};

export default useDeleteApplicant;
