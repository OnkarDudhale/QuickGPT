import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"
export default function Navbar() {
    const { theme, setTheme } = useAppContext();
    return (
        <div className="relative h-17  flex items-center">
            <div className='flex items-center justify-between gap-2 p-3 
              border border-gray-300 dark:border-white/15 rounded-md absolute right-0'>
                <div className='flex items-center gap-2 text-sm'>
                    <img src={assets.theme_icon} className='w-4 not-dark:invert' alt="" />
                    <p>Dark Mode</p>
                </div>
                <label htmlFor="theme-toggle" className='relative inline-flex cursor-pointer'>
                    <input id='theme-toggle' type="checkbox" onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className='sr-only peer' checked={theme === 'dark'} />
                    <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:bg-purple-600 transition-all'></div>
                    <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform 
                peer-checked:translate-x-4'></span>
                </label>
            </div>
        </div>
    )
}