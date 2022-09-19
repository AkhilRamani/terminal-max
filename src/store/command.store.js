import create from 'zustand'

export const useCommandStore = create((set, get) => ({
    activeCommand: undefined,
    inputValue: {},
    setActiveCommand: (commandConfig) => set({activeCommand: commandConfig}),
    setInputValue: (appName, command, fieldName, value) => {
        set(state => ({
            ...state.inputValue,
            inputValue: {
                ...state.inputValue,
                [appName]: {
                    ...state.inputValue[appName],
                    [command]: {
                        ...state.inputValue[appName]?.[command],
                        [fieldName]: value
                    },
                }
            }
        }))
    },
    getInputValue: (appName, command) => get().inputValue[appName]?.[command],
}))