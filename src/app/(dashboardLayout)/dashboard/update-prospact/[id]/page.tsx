
// "use client";

// import UpdateProspectPage from "@/Features/Prospact/updateProspactPage/updateProspactPage";
// import { useGetProspectByIdQuery } from "@/redux/api/auth/prospact/prospactApi";
// import { use } from "react";

// export default function UpdateProspect({ params }: { params: { id: string } }) {
//   // Unwrap params using React.use()
//   const unwrappedParams = use(params);
//   const prospectId = unwrappedParams.id;

//   const { data: prospectResponse, isLoading, error } = useGetProspectByIdQuery(prospectId);

//   if (isLoading) return <div className="min-h-screen p-4 text-center">Loading...</div>;
//   if (error || !prospectResponse?.data) return <div className="min-h-screen p-4 text-center">Error loading prospect</div>;

//   const prospect = prospectResponse.data;

//   return (
//     <UpdateProspectPage
//       prospect={prospect}
//       onUpdateSuccess={() => window.history.back()}
//       onCancel={() => window.history.back()}
//     />
//   );
// }
