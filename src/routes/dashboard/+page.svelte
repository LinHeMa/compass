<script lang="ts">
	let campaignName = '';
	let targetEmails = '';
	let isLoading = false;
	let message = '';

	async function handleLaunch() {
		if (!campaignName || !targetEmails) {
			alert('please fill the campaign name and emails');
			return;
		}

		isLoading = true;
		message = 'Launching campaign...';

		try {
			const response = await fetch('/api/campaign', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ campaignName, targetEmails })
			});
			const result = await response.json();

			if (result.success) {
				message = `🚀 Success! Queued ${result.processedCount} emails for simulation.`;
				// 清空表單
				campaignName = '';
				targetEmails = '';
			} else {
				message = `❌ Failed: ${result.error}`;
			}
		} catch {
			message = '❌ Network error occurred.';
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="min-h-screen bg-slate-100 p-6 font-sans">
	<div class="max-w-7xl mx-auto space-y-6">
		<div class="flex items-center justify-between border-b border-slate-200 pb-5">
			<div>
				<h1 class="text-3xl font-bold text-slate-900 tracking-tight">Nozomi Compass</h1>
				<p class="text-sm text-slate-500 mt-1">
					Micro-Enterprise Cybersecurity Threat & Phishing Simulator
				</p>
			</div>
			<div
				class="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-emerald-200"
			>
				<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
				System Operational
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
				<p class="text-sm font-medium text-slate-500 uppercase tracking-wider">
					Total Simulated Emails
				</p>
				<p class="text-4xl font-bold text-slate-900 mt-2">1,240</p>
				<p class="text-xs text-slate-400 mt-2">Across all historical campaigns</p>
			</div>
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
				<p class="text-sm font-medium text-slate-500 uppercase tracking-wider">
					Total Phishing Clicks
				</p>
				<p class="text-4xl font-bold text-rose-600 mt-2">186</p>
				<p class="text-xs text-rose-500 font-medium mt-2">⚠️ Employees required training</p>
			</div>
			<div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80">
				<p class="text-sm font-medium text-slate-500 uppercase tracking-wider">
					Average Susceptibility Rate
				</p>
				<p class="text-4xl font-bold text-amber-500 mt-2">15.0%</p>
				<div class="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
					<div class="bg-amber-500 h-full rounded-full" style="width: 15%"></div>
				</div>
			</div>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div
				class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 lg:col-span-1 h-fit"
			>
				<h2 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
					<span>🚀</span> Launch New Simulation
				</h2>

				<form class="space-y-4" onsubmit={handleLaunch}>
					<div>
						<label class="block text-sm font-medium text-slate-700 mb-1" for="name"
							>Campaign Name</label
						>
						<input
							type="text"
							id="name"
							bind:value={campaignName}
							placeholder="e.g., 2026 Q2 Urgent Payroll Notice"
							class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
						/>
					</div>

					<div>
						<label class="block text-sm font-medium text-slate-700 mb-1" for="targets"
							>Target Email List</label
						>
						<textarea
							id="targets"
							rows="5"
							bind:value={targetEmails}
							placeholder="Enter emails, one per line&#10;employee1@company.com.au&#10;employee2@company.com.au"
							class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 font-mono"
						></textarea>
					</div>
					{#if message}
						<p class="text-xs font-medium text-blue-600 bg-blue-50 p-2 rounded-lg">{message}</p>
					{/if}
					<button
						type="submit"
						disabled={isLoading}
						class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-sm transition-colors shadow-sm"
					>
						{isLoading ? 'Queuing...' : 'Queue & Launch Campaign'}
					</button>
				</form>
			</div>

			<div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 lg:col-span-2">
				<h2 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
					<span>📊</span> Active & Past Campaigns
				</h2>

				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm text-slate-500">
						<thead
							class="bg-slate-50 text-slate-700 uppercase text-xs font-semibold tracking-wider border-b border-slate-200"
						>
							<tr>
								<th class="px-4 py-3">Campaign Details</th>
								<th class="px-4 py-3">Sent</th>
								<th class="px-4 py-3">Clicks</th>
								<th class="px-4 py-3">Rate</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-slate-100">
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-4 py-4">
									<p class="font-semibold text-slate-800">Q2 Payroll Slip Scam</p>
									<p class="text-xs text-slate-400 mt-0.5">Launched: 2 hours ago</p>
								</td>
								<td class="px-4 py-4 text-slate-700 font-medium">45</td>
								<td class="px-4 py-4 text-rose-600 font-medium">12</td>
								<td class="px-4 py-4">
									<span
										class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100"
										>26.6%</span
									>
								</td>
							</tr>
							<tr class="hover:bg-slate-50/80 transition-colors">
								<td class="px-4 py-4">
									<p class="font-semibold text-slate-800">IT Urgent Password Reset</p>
									<p class="text-xs text-slate-400 mt-0.5">Launched: 3 days ago</p>
								</td>
								<td class="px-4 py-4 text-slate-700 font-medium">50</td>
								<td class="px-4 py-4 text-amber-600 font-medium">4</td>
								<td class="px-4 py-4">
									<span
										class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100"
										>8.0%</span
									>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
