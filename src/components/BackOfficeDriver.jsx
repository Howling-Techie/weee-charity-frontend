import {FaUserCircle, FaRoute, FaUser} from 'react-icons/fa';

export const BackOfficeDriver = ({driver}) => {
    const {image, name, routes} = driver;

    return (
        <div className="flex items-center bg-neutral-900 m-1 p-2 rounded">
            <div
                className="max-w-16 w-16 h-20 max-h-20 overflow-hidden rounded flex items-center justify-center bg-neutral-200">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover"/>
                ) : (
                    <FaUser className="text-neutral-400" size="3em"/>
                )}
            </div>
            <div className="ml-2">
                <div className="flex items-center">
                    <FaUserCircle className="mr-2 text-lg"/>
                    <h2 className="text-lg font-semibold">{name}</h2>
                </div>
                {routes && (
                    <div className="mt-3 flex items-center">
                        <FaRoute className="mr-2 text-md"/>
                        <h3 className="text-neutral-400 text-sm">{routes.map(r => r.reference).join(", ")}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};