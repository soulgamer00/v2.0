<script lang="ts">
	import { invalidateAll } from '$app/navigation';

	let error: string | null = null;
	let loading = false;

	async function handleSubmit(event: Event) {
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		loading = true;
		error = null;

		try {
			const response = await fetch('/login', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				await invalidateAll();
				window.location.href = '/';
			} else {
				const data = await response.json();
				error = data.error || 'Login failed';
			}
		} catch (e) {
			error = 'An error occurred during login';
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-base-200">
	<div class="card w-96 bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="card-title justify-center text-2xl mb-4">VBD-DB Login</h2>

			{#if error}
				<div class="alert alert-error mb-4">
					<span>{error}</span>
				</div>
			{/if}

			<form onsubmit={handleSubmit} method="POST" action="/login">
				<div class="form-control mb-4">
					<label class="label">
						<span class="label-text">Username</span>
					</label>
					<input
						type="text"
						name="username"
						placeholder="Enter username"
						class="input input-bordered"
						required
						disabled={loading}
					/>
				</div>

				<div class="form-control mb-4">
					<label class="label">
						<span class="label-text">Password</span>
					</label>
					<input
						type="password"
						name="password"
						placeholder="Enter password"
						class="input input-bordered"
						required
						disabled={loading}
					/>
				</div>

				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary" disabled={loading}>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

