import { Box, createStyles } from "@mantine/core"
import React, {
    useState,
    useEffect,
    useRef,
} from "react";

const useStyles = createStyles(() => ({
    root: {
        overflow: 'auto',
        padding: '0 20px',
        height: '100%'
    },
    text: {
        fontFamily: "'Fira Mono', Consolas, Menlo, Monaco, 'Courier New', Courier, monospace",
        fontSize: 14,
        lineHeight: 1.5,
        margin: 0,
        lineBreak: 'anywhere',
        whiteSpace: 'break-spaces'
    },
    commandInput: {
        outline: 'none',
        backgroundColor: 'transparent',
        color: '#ffffffdb',
        border: 0,
        width: '100%',
        resize: 'none',
        padding: 0
    },
    commandLine: {
        display: 'flex',
        whiteSpace: 'pre',
        marginTop: 10,
        '& > span': {
            width: 20
        }
    },
    outputTxt: {
        marginTop: 'unset',
        color: '#ffffff80',
    }

}))

export const Terminal = ({ children, onCommandInput, disableInput }) => {
    const { classes, cx } = useStyles()

    const textareaRef = useRef(null)
    const [currentValue, setCurrentValue] = useState("")

    useEffect(() => {
        if(textareaRef.current){
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current?.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [currentValue]);

    const onEnterPress = (e) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            onCommandInput(currentValue)
            setCurrentValue("")
        }
    }

    const focusTextArea = () => textareaRef.current?.focus()

    useEffect(focusTextArea, [disableInput])

    return (
        <Box className={classes.root} onClick={focusTextArea}>
            <Box pt={10} />
            {children}

            {!disableInput && <div className={classes.commandLine}>
                <span className={classes.text}>$</span>
                <textarea
                    className={cx(classes.text, classes.commandInput)}
                    ref={textareaRef}
                    value={currentValue}
                    onChange={e => {
                        setCurrentValue(e.target.value)
                    }}
                    onKeyDown={onEnterPress}
                />
            </div>}

            <Box pt='10%' />
        </Box>
    )
}

export const TerminalLog = ({ type, children }) => {
    const { classes, cx } = useStyles()
    const output = type === 'out';

    return (
        <div className={cx(classes.text, classes.commandInput, classes.commandLine, output && classes.outputTxt)} >
            <span>{!output && '$'}</span>
            <p className={cx(classes.text)}>{children}</p>
        </div>
    )
}