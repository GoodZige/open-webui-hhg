<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($user?.role !== 'admin') {
			if ($user?.permissions?.workspace?.models) {
				goto('/Ai/webui/workspace/models');
			} else if ($user?.permissions?.workspace?.knowledge) {
				goto('/Ai/webui/workspace/knowledge');
			} else if ($user?.permissions?.workspace?.prompts) {
				goto('/Ai/webui/workspace/prompts');
			} else if ($user?.permissions?.workspace?.tools) {
				goto('/Ai/webui/workspace/tools');
			} else {
				goto('/Ai/webui/');
			}
		} else {
			goto('/Ai/webui/workspace/models');
		}
	});
</script>
