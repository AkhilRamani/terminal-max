import { Box, createStyles, Group, Paper } from "@mantine/core"
import { InputGroup } from "./inputGroup";
import { useCommandStore } from "../store/command.store";

const useStyles = createStyles(theme => ({
    card: {
        position: 'relative',
        overflow: 'visible',
        padding: theme.spacing.md,
        // paddingTop: theme.spacing.xl * 1.5 + ICON_SIZE / 3,
    },
    positional: {
    }
}))

export const CommandInput = ({ activeCommand }) => {
    const { getInputValue, setInputValue } = useCommandStore(state => state)
    const inputValue = getInputValue(activeCommand.app, activeCommand.name)
    const { classes } = useStyles();

    const _handleInputChange = (name, value) => {
        setInputValue(activeCommand.app, activeCommand.name, name, value);
    }

    const { inputs } = activeCommand;

    return (
        <Group align='stretch' noWrap>
            {inputs.positional && <Paper className={classes.card} radius='md' withBorder >
                <Group align='flex-start'>
                    <Box className={classes.positional}>
                        {/* <Text size='md'>Positional</Text> */}
                        <InputGroup inputs={inputs.positional} flexOrder='column' values={inputValue} onChange={_handleInputChange} />
                    </Box>
                </Group>
            </Paper>}
            {inputs.optional && <Paper className={classes.card} radius='md' withBorder style={{ flex: 1 }} >
                <InputGroup inputs={inputs.optional} flexOrder='row' values={inputValue} onChange={_handleInputChange} />
            </Paper>}
        </Group>
    )
}