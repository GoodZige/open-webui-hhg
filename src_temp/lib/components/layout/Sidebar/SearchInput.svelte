<script lang="ts">
	import { getAllTags } from '$lib/apis/chats';
	import { tags } from '$lib/stores';
	import { getContext, createEventDispatcher, onMount, onDestroy, tick } from 'svelte';
	import { fade } from 'svelte/transition';

	const dispatch = createEventDispatcher();
	const i18n = getContext('i18n');

	export let placeholder = '';
	export let value = '';

	let selectedIdx = 0;

	let lastWord = '';
	$: lastWord = value ? value.split(' ').at(-1) : value;

	let options = [
		{
			name: 'tag:',
			description: $i18n.t('search for tags')
		}
	];
	let focused = false;
	let loading = false;

	let filteredOptions = options;
	$: filteredOptions = options.filter((option) => {
		return option.name.startsWith(lastWord);
	});

	let filteredTags = [];
	$: filteredTags = lastWord.startsWith('tag:')
		? [
				...$tags,
				{
					id: 'none',
					name: $i18n.t('Untagged')
				}
			].filter((tag) => {
				const tagName = lastWord.slice(4);
				if (tagName) {
					const tagId = tagName.replace(' ', '_').toLowerCase();

					if (tag.id !== tagId) {
						return tag.id.startsWith(tagId);
					} else {
						return false;
					}
				} else {
					return true;
				}
			})
		: [];

	const initTags = async () => {
		loading = true;
		await tags.set(await getAllTags(localStorage.token));
		loading = false;
	};

	const documentClickHandler = (e) => {
		const searchContainer = document.getElementById('search-container');
		const chatSearch = document.getElementById('chat-search');

		if (!searchContainer.contains(e.target) && !chatSearch.contains(e.target)) {
			if (e.target.id.startsWith('search-tag-') || e.target.id.startsWith('search-option-')) {
				return;
			}
			focused = false;
		}
	};

	onMount(() => {
		document.addEventListener('click', documentClickHandler);
	});

	onDestroy(() => {
		document.removeEventListener('click', documentClickHandler);
	});
</script>
