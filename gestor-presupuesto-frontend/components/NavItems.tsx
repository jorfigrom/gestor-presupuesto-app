import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

const NavItems = () => {

    const pathName = usePathname();

    return (
        <div className="sidebar">
            <Link href='/' className="link-logo">
                <img src="/assets/logo.svg" alt="logo.svg" width={32} height={32} />
                <h1>Gestor</h1>
            </Link>
            <nav className="flex flex-1 flex-col gap-2">
                {sidebarLinks.map((link) => {

                    const isActive = pathName === link.route || 
                                     (pathName.includes(link.route) && link.route.length > 1);

                    return (
                        <Link
                            key={link.route}
                            href={link.route} 
                            className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                            <img src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p>{link.label}</p>
                        </Link>
                    );
                })} 
            </nav> 
        </div> 
    );
};

export default NavItems;