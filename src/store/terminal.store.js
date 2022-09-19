import create from 'zustand'
import { TerminalLog } from '../components/terminal'

export const useTerminalStore = create((set, get) => ({
    terminalActive: true,
    disableTerminal: () => set({terminalActive: false}),
    enableTerminal: () => set({terminalActive: true}),
    terminalLineData: [<TerminalLog key={0}>Welcome to terminal ultra pro max 😅!</TerminalLog>],
    runCommand: (command) => {
        const [commandName, ...commandArgs] = command.split(' ')
        if (command === 'clear') {
            set({terminalLineData: []})
        }
        else {
            if(command.trim()){
                set({terminalActive: false})
                window.cmdEvents.execCommand({ name: commandName, args: commandArgs })
            }
            set(state => ({ terminalLineData: [...state.terminalLineData, <TerminalLog key={state.terminalLineData.length} type={'inpt'}>{command}</TerminalLog>]}))
        }
    },
    putOutput: (data) => {
        set(state => ({
            terminalLineData: [
                ...state.terminalLineData, 
                <TerminalLog key={state.terminalLineData.length} type={'out'}>{data}</TerminalLog>
            ]
        }))
    }
}))