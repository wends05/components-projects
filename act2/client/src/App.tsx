import AddApplicant from "./components/AddApplicant";
import ApplicantsView from "./components/ApplicantsView";

function App() {
  return (
    <main vaul-drawer-wrapper="true" className="flex flex-col items-center justify-center w-full min-h-screen gap-5 py-10">
      <AddApplicant />
      <ApplicantsView />
    </main>
  );
}

export default App;
