import { Box, Button, createStyles, SegmentedControl, Center } from "@mantine/core"
import { useWindowEvent } from '@mantine/hooks';
import { IconPrompt, IconBoxPadding } from '@tabler/icons';
import { useCommandStore } from "../store/command.store";
import { useTerminalStore } from "../store/terminal.store";

const useStyles = createStyles(theme => ({
    root: {
        marginTop: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    runCode: {
        fontWeight: 700,
        fontSize: 11,
        padding: '4px 7px',
        borderRadius: 4,
        marginLeft: 5,
        marginRight: -5,
        color: '#ffffff99',
        // backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        backgroundColor: theme.colorScheme === 'dark' ? theme.fn.variant({
            variant: "filled",
            color: theme.primaryColor,
        }).hover : theme.colors.gray[0],
        // border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]}`,
    }
}))

export const Controls = ({ activeCommand }) => {
    const { classes } = useStyles()
    const getInputValues = useCommandStore(state => state.getInputValue)
    const runCommand = useTerminalStore(state => state.runCommand)

    const _handleRun = () => {
        const inputValues = getInputValues(activeCommand.app, activeCommand.name)

        const command = Object.entries(inputValues).reduce((acc, [key, value]) => {
            return `${acc} --${key} ${value}`
        }, `${activeCommand.app} ${activeCommand.name}`)

        runCommand(command)
    }

    useWindowEvent('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.code === 'Quote'){
            _handleRun()
        }
    })    

    return (
        <Box className={classes.root}>
            <Button
                onClick={_handleRun}
                rightIcon={<span className={classes.runCode}>⌘ + '</span>}
            >Run</Button>

            <SegmentedControl
                // onChange={}
                data={[
                    {
                        value: 'integrated',
                        label: (
                            <Center>
                                <IconBoxPadding size={16} stroke={1.5} />
                                <Box ml={10}>Integrated</Box>
                            </Center>
                        ),
                    },
                    {
                        value: 'native',
                        label: (
                            <Center>
                                <IconPrompt size={16} stroke={1.5} />
                                <Box ml={10}>Native</Box>
                            </Center>
                        ),
                    },
                ]}
            />
        </Box>
    )
}