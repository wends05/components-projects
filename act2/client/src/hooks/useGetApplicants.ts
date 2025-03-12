import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { URL } from "../utils/constants";
import Applicant from "../types/Applicant";

const useGetApplicants = () => {
  return useQuery({
    queryKey: ["applicants"],
    queryFn: async () =>
      fetchData<Applicant[]>({
        url: `${URL}/applicants`,
      }),
  });
};

export default useGetApplicants;
