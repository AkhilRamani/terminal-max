import { Box, Skeleton } from "@mantine/core"
import { CommandInput } from "../components/commandInput"
import { CommandSideBar } from "../components/commandSideBar"
import { Controls } from "../components/controls"
import { TerminalBlock } from "../components/terminalBlock"
import { useCommandStore } from "../store/command.store"

export const HomePage = ({ commandConfig }) => {
	const activeCommand = useCommandStore(state => state.activeCommand)

	return (
		<>
			<CommandSideBar commandConfig={commandConfig} />

			<Box style={{ margin: '0 20px', padding: '20px 0', flexGrow: 1, display: 'flex', flexDirection: 'column', maxHeight: '100vh' }}>
				{
					!activeCommand ?
						<>
							<Skeleton width='100%' height='33%' />
							<Skeleton mt={20} width='100%' height='67%' />
						</>
						:
						<>
							<CommandInput activeCommand={activeCommand} />
							<Controls activeCommand={activeCommand} />
							<TerminalBlock />
						</>

				}
			</Box>

		</>
	)
}