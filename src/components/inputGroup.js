import { createStyles, Group, Select, TextInput } from "@mantine/core"

const useStyles = createStyles(theme => ({
    inputGroup: {
        display: 'flex',
        flexDirection: 'column'
    }
}))

const Input = ({ selectOptions, name, displayTitle, value, onChange }) => (
    selectOptions ?
        <Select
            key={name}
            data={selectOptions}
            placeholder={displayTitle}
            label={displayTitle}
            value={value}
            onChange={option => onChange(option)}
        />
        :
        <TextInput
            label={displayTitle}
            placeholder={displayTitle}
            value={value}
            onChange={event => onChange(event.target.value)}
        />
)

export const InputGroup = ({ inputs, flexOrder, values, onChange }) => {
    const { classes } = useStyles()

    return (
        <Group className={classes.inputGroup} style={{ flexDirection: flexOrder }}>
            {inputs.map((input, index) =>
                <Input
                    key={input.name + index}
                    name={input.name}
                    value={values?.[input.name] || ''}
                    displayTitle={input.displayTitle}
                    selectOptions={input.selectOptions}
                    onChange={(data) => onChange(input.name, data)}
                />
            )}
        </Group>
    )
}