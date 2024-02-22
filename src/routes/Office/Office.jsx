import {Container} from "../../components/Container.jsx";
import 'react-circular-progressbar/dist/styles.css';
import {BackOfficeDriver} from "../../components/BackOfficeDriver.jsx";
import {FaUserTie} from "react-icons/fa";
import {CardWithProgress} from "../../components/cards/CardWithProgress.jsx";
import {CardWithIcon} from "../../components/cards/CardWithIcon.jsx";
import {CardWithLink} from "../../components/cards/CardWithLink.jsx";
import {CalendarWeek} from "../../components/CalendarWeek.jsx";
import {Header} from "../../components/Header.jsx";

export const Office = () => {
    const testEvents = [
        {
            date: new Date('2024-02-19'),
            id: 1,
            title: 'North West',
            transfers: [
                {id: 1, startTime: '10:00', endTime: '11:00', title: 'Company A', status: "Successful"},
                {id: 2, startTime: '12:00', endTime: '13:00', title: 'Company B', status: "Successful"},
            ],
        },
        {
            date: new Date('2024-02-19'),
            id: 2,
            title: 'Liverpool',
            transfers: [
                {id: 3, startTime: '10:00', endTime: '11:00', title: 'Company 1', status: "Successful"},
                {id: 4, startTime: '12:00', endTime: '13:00', title: 'Company 2', status: "Unsuccessful"},
                {id: 4, startTime: '16:00', endTime: '17:00', title: 'Company 3', status: "En Route"},
            ],
        },
        {
            date: new Date('2024-02-20'),
            id: 3,
            title: 'North East',
            transfers: [
                {id: 5, startTime: '10:00', endTime: '11:00', title: 'Company Red'},
                {id: 6, startTime: '12:00', endTime: '13:00', title: 'Company Green'},
                {id: 7, startTime: '13:00', endTime: '14:00', title: 'Company Blue'},
            ],
        },
    ];
    const testDrivers = [
        {
            name: 'Tom Jones',
            id: 0,
            assignedRoute: {
                name: 'Liverpool',
                id: 123
            }
        },
        {
            name: 'John Doe',
            id: 1,
            assignedRoute: {name: 'North West', id: 101},

        }
    ];
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
                    <CalendarWeek startDate={new Date(2024, 1, 21)} routes={testEvents}/>
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