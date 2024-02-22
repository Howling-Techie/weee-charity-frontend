import {Office} from "./routes/Office/Office.jsx";
import ErrorPage from "./ErrorPage.jsx";
import {Route, Routes} from "react-router-dom";
import {Clients} from "./routes/Office/Clients.jsx";
import {Sidebar} from "./components/Sidebar.jsx";
import {Transfers} from "./routes/Office/Transfers.jsx";
import {Transfer} from "./routes/Office/Transfer.jsx";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Sidebar/>}>
                <Route path="/office" element={<Office/>}/>
                <Route path="/office/clients" element={<Clients/>}/>
                <Route path="/office/transfers" element={<Transfers/>}/>
                <Route path="/office/transfers/:transferId" element={<Transfer/>}/>
            </Route>
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    )
}