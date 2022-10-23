declare global {
	import { MessageProviderInst} from 'naive-ui';
	interface Window {
		$message: MessageProviderInst;
	}
}

export {}
