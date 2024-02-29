import {Container} from "../../components/Container.jsx";
import 'react-circular-progressbar/dist/styles.css';
import {BackOfficeDriver} from "../../components/BackOfficeDriver.jsx";
import {FaUserTie} from "react-icons/fa";
import {CardWithProgress} from "../../components/cards/CardWithProgress.jsx";
import {CardWithIcon} from "../../components/cards/CardWithIcon.jsx";
import {CardWithLink} from "../../components/cards/CardWithLink.jsx";
import {CalendarWeek} from "../../components/CalendarWeek.jsx";
import {Header} from "../../components/Header.jsx";
import testRoutes from "../../test data/routes.json";
import testTransfers from "../../test data/transfers.json";
import testStaff from "../../test data/staff.json";

export const Office = () => {
    const testDrivers = [];
    for (const driver of testStaff.filter(staff => staff.role === "driver")) {
        const driverRoutes = testRoutes.filter(route => route.drivers.includes(driver.id) && route.date === "2024-03-06");
        if (driverRoutes.length > 0) {
            testDrivers.push({...driver, routes: driverRoutes});
        }
    }
    for (const testRoute of testRoutes) {
        testRoute.transfers = testTransfers.filter(transfer => transfer.route_id === testRoute.id);
    }
    return (
        <Container>
            <Header path={[{link: "/office", title: "Back Office"}]}
                    title="Back Office"/>
            <div className="grid grid-cols-4 gap-4 mb-4">
                <CardWithProgress title="Transfers Today" text="8/12" currentProg={8} maxProg={12} link="/office/routes"
                                  linkText="View Routes"/>
                <CardWithIcon title="Clients" text="123 Clients" icon={{type: FaUserTie}} link="/office/clients"
                              linkText="View Clients"/>
                <CardWithProgress title="Requests" text="2 Pending" currentProg={10} maxProg={12}
                                  link="/office/requests"
                                  linkText="View Requests"/>
                <CardWithProgress title="Transfers" text="8 Unassigned" currentProg={4} maxProg={12}
                                  link="/office/transfers"
                                  linkText="View Transfers"/>
            </div>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="col-start-1 col-span-3 min-h-96">
                    <CalendarWeek startDate={new Date(2024, 1, 21)} routes={testRoutes}/>
                </div>
                <div className="col-span-3 lg:col-span-1 h-full flex-col flex">
                    <CardWithLink link="/office/drivers" linkText="View All Drivers" title="Today's Drivers">
                        <div className="flex flex-row lg:flex-col">
                            {testDrivers && testDrivers.map(d => {
                                return (<BackOfficeDriver key={d.id} driver={d}/>)
                            })}
                        </div>
                    </CardWithLink>
                </div>
            </div>
        </Container>
    )
}