import { useNavigation } from "@hooks/useNavigation";
import { View } from "@pages";

const PAGES = ["preview"];

function App() {
    const { currentPage, navigate } = useNavigation(PAGES);

    let page;
    if (currentPage === "preview") {
        page = <View />;
    }

    return (
        <>
            {page}
        </>
    );
}

export default App;