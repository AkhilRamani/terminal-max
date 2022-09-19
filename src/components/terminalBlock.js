import { useEffect } from "react"
import { createStyles, Paper, Title } from "@mantine/core"
import { useTerminalStore } from "../store/terminal.store"
import { Terminal } from "./terminal"

const useStyles = createStyles(theme => ({
    root: {
        // padding: theme.spacing.md,
        marginTop: theme.spacing.md,
        overflow: 'auto',
        // flexGrow: 1
        height: '100%'
    }
}))

export const TerminalBlock = () => {
    const { classes } = useStyles()
    const { terminalActive, enableTerminal, runCommand, terminalLineData, putOutput } = useTerminalStore(state => state)

    useEffect(() => {
        window.cmdEvents.onCommandSuccess((event, data) => {
            putOutput(data)
            enableTerminal()
        })

        window.cmdEvents.onCommandError((event, data) => { 
            console.log('command err data:', data)
            putOutput(data)
            enableTerminal()
        })

        window.cmdEvents.onError((event, err) => {
            putOutput(err.toString())
            enableTerminal()
        })

        window.cmdEvents.onExit((event, exitCode) => {
            console.log('exitCode', exitCode)
            enableTerminal()
        })

        return () => window.cmdEvents.removeAllListeners()
    }, [])

    const onTerminalCommand = (commandText) => runCommand(commandText)

    return (
        <Paper className={classes.root} radius='md' withBorder>
            <Terminal onCommandInput={onTerminalCommand} disableInput={!terminalActive}>
                {terminalLineData}
            </Terminal>
        </Paper>
    )
}