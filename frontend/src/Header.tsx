// import { useIsMobile } from "@/hooks/use-mobile"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router';
import { ModeToggle } from './components/mode-toggle';

const Header = () => {
    return (
        <nav className='flex items-center justify-between w-full'>
            <div className='text-2xl font-bold'>Wheres My Package</div>
            <div>
                {/* Future navigation items can go here */}
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink className='cursor-pointer'>
                                <Link to="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className='cursor-pointer'>
                                <Link to="/login">Login</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className='cursor-pointer'>
                                <Link to="/register">Register</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <ModeToggle />
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    );
};
export default Header;
