import './ThemeSelector.css'
import { useTheme } from '../../context/ThemeContext'
import { MdBrightnessHigh } from 'react-icons/md'

const themeColors = ['#5b3b2ecd', '#249c6b', 'coral']

export default function ThemeSelector() {

    const { changeColor, changeMode, mode } = useTheme()

  return (
    <div className='theme-selector'>
        <div className='mode-toggle'>
            { mode === 'light' ? <MdBrightnessHigh style={{cursor: 'pointer'}} className='mode-icon' onClick={(() => changeMode('dark'))} /> :
                 <MdBrightnessHigh style={{cursor: 'pointer', filter: 'invert(100%)'}} className='mode-icon' onClick={(() => changeMode('light'))} />
            }
         </div>
        <div className='theme-buttons'>
            {themeColors.map(color => (
                <div
                    key={color}
                    onClick={() => changeColor(color)}
                    style={{background: color}}
                />
            ))}
        </div>
    </div>
  )
}
