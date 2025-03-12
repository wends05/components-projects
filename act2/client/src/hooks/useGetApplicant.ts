import Applicant from "@/types/Applicant";
import { URL } from "@/utils/constants";
import fetchData from "@/utils/fetchData";
import { useQuery } from "@tanstack/react-query";

const useGetApplicant = (id: string) => {
  return useQuery({
    queryFn: async () => await fetchData<Applicant>({ url: `${URL}/applicant/${id}` }),
    queryKey: ["applicant", id],
  });
};

export default useGetApplicant;
