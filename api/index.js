// Licensed to Elasticsearch B.V under one or more agreements.
// Elasticsearch B.V licenses this file to you under the Apache 2.0 License.
// See the LICENSE file in the project root for more information

'use strict'

const assert = require('assert')

function ESAPI (opts) {
  assert(opts.makeRequest, 'Missing makeRequest function')
  assert(opts.ConfigurationError, 'Missing ConfigurationError class')
  assert(opts.result, 'Missing default result object')

  const { result } = opts
  opts.handleError = handleError
  opts.snakeCaseKeys = snakeCaseKeys

  const apis = {
    async_search: {
      delete: lazyLoad('async_search.delete', opts),
      get: lazyLoad('async_search.get', opts),
      submit: lazyLoad('async_search.submit', opts)
    },
    asyncSearch: {
      delete: lazyLoad('async_search.delete', opts),
      get: lazyLoad('async_search.get', opts),
      submit: lazyLoad('async_search.submit', opts)
    },
    autoscaling: {
      delete_autoscaling_policy: lazyLoad('autoscaling.delete_autoscaling_policy', opts),
      deleteAutoscalingPolicy: lazyLoad('autoscaling.delete_autoscaling_policy', opts),
      get_autoscaling_decision: lazyLoad('autoscaling.get_autoscaling_decision', opts),
      getAutoscalingDecision: lazyLoad('autoscaling.get_autoscaling_decision', opts),
      get_autoscaling_policy: lazyLoad('autoscaling.get_autoscaling_policy', opts),
      getAutoscalingPolicy: lazyLoad('autoscaling.get_autoscaling_policy', opts),
      put_autoscaling_policy: lazyLoad('autoscaling.put_autoscaling_policy', opts),
      putAutoscalingPolicy: lazyLoad('autoscaling.put_autoscaling_policy', opts)
    },
    bulk: lazyLoad('bulk', opts),
    cat: {
      aliases: lazyLoad('cat.aliases', opts),
      allocation: lazyLoad('cat.allocation', opts),
      count: lazyLoad('cat.count', opts),
      fielddata: lazyLoad('cat.fielddata', opts),
      health: lazyLoad('cat.health', opts),
      help: lazyLoad('cat.help', opts),
      indices: lazyLoad('cat.indices', opts),
      master: lazyLoad('cat.master', opts),
      ml_data_frame_analytics: lazyLoad('cat.ml_data_frame_analytics', opts),
      mlDataFrameAnalytics: lazyLoad('cat.ml_data_frame_analytics', opts),
      ml_datafeeds: lazyLoad('cat.ml_datafeeds', opts),
      mlDatafeeds: lazyLoad('cat.ml_datafeeds', opts),
      ml_jobs: lazyLoad('cat.ml_jobs', opts),
      mlJobs: lazyLoad('cat.ml_jobs', opts),
      ml_trained_models: lazyLoad('cat.ml_trained_models', opts),
      mlTrainedModels: lazyLoad('cat.ml_trained_models', opts),
      nodeattrs: lazyLoad('cat.nodeattrs', opts),
      nodes: lazyLoad('cat.nodes', opts),
      pending_tasks: lazyLoad('cat.pending_tasks', opts),
      pendingTasks: lazyLoad('cat.pending_tasks', opts),
      plugins: lazyLoad('cat.plugins', opts),
      recovery: lazyLoad('cat.recovery', opts),
      repositories: lazyLoad('cat.repositories', opts),
      segments: lazyLoad('cat.segments', opts),
      shards: lazyLoad('cat.shards', opts),
      snapshots: lazyLoad('cat.snapshots', opts),
      tasks: lazyLoad('cat.tasks', opts),
      templates: lazyLoad('cat.templates', opts),
      thread_pool: lazyLoad('cat.thread_pool', opts),
      threadPool: lazyLoad('cat.thread_pool', opts),
      transforms: lazyLoad('cat.transforms', opts)
    },
    ccr: {
      delete_auto_follow_pattern: lazyLoad('ccr.delete_auto_follow_pattern', opts),
      deleteAutoFollowPattern: lazyLoad('ccr.delete_auto_follow_pattern', opts),
      follow: lazyLoad('ccr.follow', opts),
      follow_info: lazyLoad('ccr.follow_info', opts),
      followInfo: lazyLoad('ccr.follow_info', opts),
      follow_stats: lazyLoad('ccr.follow_stats', opts),
      followStats: lazyLoad('ccr.follow_stats', opts),
      forget_follower: lazyLoad('ccr.forget_follower', opts),
      forgetFollower: lazyLoad('ccr.forget_follower', opts),
      get_auto_follow_pattern: lazyLoad('ccr.get_auto_follow_pattern', opts),
      getAutoFollowPattern: lazyLoad('ccr.get_auto_follow_pattern', opts),
      pause_auto_follow_pattern: lazyLoad('ccr.pause_auto_follow_pattern', opts),
      pauseAutoFollowPattern: lazyLoad('ccr.pause_auto_follow_pattern', opts),
      pause_follow: lazyLoad('ccr.pause_follow', opts),
      pauseFollow: lazyLoad('ccr.pause_follow', opts),
      put_auto_follow_pattern: lazyLoad('ccr.put_auto_follow_pattern', opts),
      putAutoFollowPattern: lazyLoad('ccr.put_auto_follow_pattern', opts),
      resume_auto_follow_pattern: lazyLoad('ccr.resume_auto_follow_pattern', opts),
      resumeAutoFollowPattern: lazyLoad('ccr.resume_auto_follow_pattern', opts),
      resume_follow: lazyLoad('ccr.resume_follow', opts),
      resumeFollow: lazyLoad('ccr.resume_follow', opts),
      stats: lazyLoad('ccr.stats', opts),
      unfollow: lazyLoad('ccr.unfollow', opts)
    },
    clear_scroll: lazyLoad('clear_scroll', opts),
    clearScroll: lazyLoad('clear_scroll', opts),
    cluster: {
      allocation_explain: lazyLoad('cluster.allocation_explain', opts),
      allocationExplain: lazyLoad('cluster.allocation_explain', opts),
      delete_component_template: lazyLoad('cluster.delete_component_template', opts),
      deleteComponentTemplate: lazyLoad('cluster.delete_component_template', opts),
      delete_voting_config_exclusions: lazyLoad('cluster.delete_voting_config_exclusions', opts),
      deleteVotingConfigExclusions: lazyLoad('cluster.delete_voting_config_exclusions', opts),
      exists_component_template: lazyLoad('cluster.exists_component_template', opts),
      existsComponentTemplate: lazyLoad('cluster.exists_component_template', opts),
      get_component_template: lazyLoad('cluster.get_component_template', opts),
      getComponentTemplate: lazyLoad('cluster.get_component_template', opts),
      get_settings: lazyLoad('cluster.get_settings', opts),
      getSettings: lazyLoad('cluster.get_settings', opts),
      health: lazyLoad('cluster.health', opts),
      pending_tasks: lazyLoad('cluster.pending_tasks', opts),
      pendingTasks: lazyLoad('cluster.pending_tasks', opts),
      post_voting_config_exclusions: lazyLoad('cluster.post_voting_config_exclusions', opts),
      postVotingConfigExclusions: lazyLoad('cluster.post_voting_config_exclusions', opts),
      put_component_template: lazyLoad('cluster.put_component_template', opts),
      putComponentTemplate: lazyLoad('cluster.put_component_template', opts),
      put_settings: lazyLoad('cluster.put_settings', opts),
      putSettings: lazyLoad('cluster.put_settings', opts),
      remote_info: lazyLoad('cluster.remote_info', opts),
      remoteInfo: lazyLoad('cluster.remote_info', opts),
      reroute: lazyLoad('cluster.reroute', opts),
      state: lazyLoad('cluster.state', opts),
      stats: lazyLoad('cluster.stats', opts)
    },
    count: lazyLoad('count', opts),
    create: lazyLoad('create', opts),
    delete: lazyLoad('delete', opts),
    delete_by_query: lazyLoad('delete_by_query', opts),
    deleteByQuery: lazyLoad('delete_by_query', opts),
    delete_by_query_rethrottle: lazyLoad('delete_by_query_rethrottle', opts),
    deleteByQueryRethrottle: lazyLoad('delete_by_query_rethrottle', opts),
    delete_script: lazyLoad('delete_script', opts),
    deleteScript: lazyLoad('delete_script', opts),
    enrich: {
      delete_policy: lazyLoad('enrich.delete_policy', opts),
      deletePolicy: lazyLoad('enrich.delete_policy', opts),
      execute_policy: lazyLoad('enrich.execute_policy', opts),
      executePolicy: lazyLoad('enrich.execute_policy', opts),
      get_policy: lazyLoad('enrich.get_policy', opts),
      getPolicy: lazyLoad('enrich.get_policy', opts),
      put_policy: lazyLoad('enrich.put_policy', opts),
      putPolicy: lazyLoad('enrich.put_policy', opts),
      stats: lazyLoad('enrich.stats', opts)
    },
    eql: {
      search: lazyLoad('eql.search', opts)
    },
    exists: lazyLoad('exists', opts),
    exists_source: lazyLoad('exists_source', opts),
    existsSource: lazyLoad('exists_source', opts),
    explain: lazyLoad('explain', opts),
    field_caps: lazyLoad('field_caps', opts),
    fieldCaps: lazyLoad('field_caps', opts),
    get: lazyLoad('get', opts),
    get_script: lazyLoad('get_script', opts),
    getScript: lazyLoad('get_script', opts),
    get_script_context: lazyLoad('get_script_context', opts),
    getScriptContext: lazyLoad('get_script_context', opts),
    get_script_languages: lazyLoad('get_script_languages', opts),
    getScriptLanguages: lazyLoad('get_script_languages', opts),
    get_source: lazyLoad('get_source', opts),
    getSource: lazyLoad('get_source', opts),
    graph: {
      explore: lazyLoad('graph.explore', opts)
    },
    ilm: {
      delete_lifecycle: lazyLoad('ilm.delete_lifecycle', opts),
      deleteLifecycle: lazyLoad('ilm.delete_lifecycle', opts),
      explain_lifecycle: lazyLoad('ilm.explain_lifecycle', opts),
      explainLifecycle: lazyLoad('ilm.explain_lifecycle', opts),
      get_lifecycle: lazyLoad('ilm.get_lifecycle', opts),
      getLifecycle: lazyLoad('ilm.get_lifecycle', opts),
      get_status: lazyLoad('ilm.get_status', opts),
      getStatus: lazyLoad('ilm.get_status', opts),
      move_to_step: lazyLoad('ilm.move_to_step', opts),
      moveToStep: lazyLoad('ilm.move_to_step', opts),
      put_lifecycle: lazyLoad('ilm.put_lifecycle', opts),
      putLifecycle: lazyLoad('ilm.put_lifecycle', opts),
      remove_policy: lazyLoad('ilm.remove_policy', opts),
      removePolicy: lazyLoad('ilm.remove_policy', opts),
      retry: lazyLoad('ilm.retry', opts),
      start: lazyLoad('ilm.start', opts),
      stop: lazyLoad('ilm.stop', opts)
    },
    index: lazyLoad('index', opts),
    indices: {
      analyze: lazyLoad('indices.analyze', opts),
      clear_cache: lazyLoad('indices.clear_cache', opts),
      clearCache: lazyLoad('indices.clear_cache', opts),
      clone: lazyLoad('indices.clone', opts),
      close: lazyLoad('indices.close', opts),
      create: lazyLoad('indices.create', opts),
      create_data_stream: lazyLoad('indices.create_data_stream', opts),
      createDataStream: lazyLoad('indices.create_data_stream', opts),
      delete: lazyLoad('indices.delete', opts),
      delete_alias: lazyLoad('indices.delete_alias', opts),
      deleteAlias: lazyLoad('indices.delete_alias', opts),
      delete_data_stream: lazyLoad('indices.delete_data_stream', opts),
      deleteDataStream: lazyLoad('indices.delete_data_stream', opts),
      delete_index_template: lazyLoad('indices.delete_index_template', opts),
      deleteIndexTemplate: lazyLoad('indices.delete_index_template', opts),
      delete_template: lazyLoad('indices.delete_template', opts),
      deleteTemplate: lazyLoad('indices.delete_template', opts),
      exists: lazyLoad('indices.exists', opts),
      exists_alias: lazyLoad('indices.exists_alias', opts),
      existsAlias: lazyLoad('indices.exists_alias', opts),
      exists_index_template: lazyLoad('indices.exists_index_template', opts),
      existsIndexTemplate: lazyLoad('indices.exists_index_template', opts),
      exists_template: lazyLoad('indices.exists_template', opts),
      existsTemplate: lazyLoad('indices.exists_template', opts),
      exists_type: lazyLoad('indices.exists_type', opts),
      existsType: lazyLoad('indices.exists_type', opts),
      flush: lazyLoad('indices.flush', opts),
      flush_synced: lazyLoad('indices.flush_synced', opts),
      flushSynced: lazyLoad('indices.flush_synced', opts),
      forcemerge: lazyLoad('indices.forcemerge', opts),
      freeze: lazyLoad('indices.freeze', opts),
      get: lazyLoad('indices.get', opts),
      get_alias: lazyLoad('indices.get_alias', opts),
      getAlias: lazyLoad('indices.get_alias', opts),
      get_data_stream: lazyLoad('indices.get_data_stream', opts),
      getDataStream: lazyLoad('indices.get_data_stream', opts),
      get_field_mapping: lazyLoad('indices.get_field_mapping', opts),
      getFieldMapping: lazyLoad('indices.get_field_mapping', opts),
      get_index_template: lazyLoad('indices.get_index_template', opts),
      getIndexTemplate: lazyLoad('indices.get_index_template', opts),
      get_mapping: lazyLoad('indices.get_mapping', opts),
      getMapping: lazyLoad('indices.get_mapping', opts),
      get_settings: lazyLoad('indices.get_settings', opts),
      getSettings: lazyLoad('indices.get_settings', opts),
      get_template: lazyLoad('indices.get_template', opts),
      getTemplate: lazyLoad('indices.get_template', opts),
      get_upgrade: lazyLoad('indices.get_upgrade', opts),
      getUpgrade: lazyLoad('indices.get_upgrade', opts),
      open: lazyLoad('indices.open', opts),
      put_alias: lazyLoad('indices.put_alias', opts),
      putAlias: lazyLoad('indices.put_alias', opts),
      put_index_template: lazyLoad('indices.put_index_template', opts),
      putIndexTemplate: lazyLoad('indices.put_index_template', opts),
      put_mapping: lazyLoad('indices.put_mapping', opts),
      putMapping: lazyLoad('indices.put_mapping', opts),
      put_settings: lazyLoad('indices.put_settings', opts),
      putSettings: lazyLoad('indices.put_settings', opts),
      put_template: lazyLoad('indices.put_template', opts),
      putTemplate: lazyLoad('indices.put_template', opts),
      recovery: lazyLoad('indices.recovery', opts),
      refresh: lazyLoad('indices.refresh', opts),
      reload_search_analyzers: lazyLoad('indices.reload_search_analyzers', opts),
      reloadSearchAnalyzers: lazyLoad('indices.reload_search_analyzers', opts),
      rollover: lazyLoad('indices.rollover', opts),
      segments: lazyLoad('indices.segments', opts),
      shard_stores: lazyLoad('indices.shard_stores', opts),
      shardStores: lazyLoad('indices.shard_stores', opts),
      shrink: lazyLoad('indices.shrink', opts),
      simulate_index_template: lazyLoad('indices.simulate_index_template', opts),
      simulateIndexTemplate: lazyLoad('indices.simulate_index_template', opts),
      simulate_template: lazyLoad('indices.simulate_template', opts),
      simulateTemplate: lazyLoad('indices.simulate_template', opts),
      split: lazyLoad('indices.split', opts),
      stats: lazyLoad('indices.stats', opts),
      unfreeze: lazyLoad('indices.unfreeze', opts),
      update_aliases: lazyLoad('indices.update_aliases', opts),
      updateAliases: lazyLoad('indices.update_aliases', opts),
      upgrade: lazyLoad('indices.upgrade', opts),
      validate_query: lazyLoad('indices.validate_query', opts),
      validateQuery: lazyLoad('indices.validate_query', opts)
    },
    info: lazyLoad('info', opts),
    ingest: {
      delete_pipeline: lazyLoad('ingest.delete_pipeline', opts),
      deletePipeline: lazyLoad('ingest.delete_pipeline', opts),
      get_pipeline: lazyLoad('ingest.get_pipeline', opts),
      getPipeline: lazyLoad('ingest.get_pipeline', opts),
      processor_grok: lazyLoad('ingest.processor_grok', opts),
      processorGrok: lazyLoad('ingest.processor_grok', opts),
      put_pipeline: lazyLoad('ingest.put_pipeline', opts),
      putPipeline: lazyLoad('ingest.put_pipeline', opts),
      simulate: lazyLoad('ingest.simulate', opts)
    },
    license: {
      delete: lazyLoad('license.delete', opts),
      get: lazyLoad('license.get', opts),
      get_basic_status: lazyLoad('license.get_basic_status', opts),
      getBasicStatus: lazyLoad('license.get_basic_status', opts),
      get_trial_status: lazyLoad('license.get_trial_status', opts),
      getTrialStatus: lazyLoad('license.get_trial_status', opts),
      post: lazyLoad('license.post', opts),
      post_start_basic: lazyLoad('license.post_start_basic', opts),
      postStartBasic: lazyLoad('license.post_start_basic', opts),
      post_start_trial: lazyLoad('license.post_start_trial', opts),
      postStartTrial: lazyLoad('license.post_start_trial', opts)
    },
    mget: lazyLoad('mget', opts),
    migration: {
      deprecations: lazyLoad('migration.deprecations', opts)
    },
    ml: {
      close_job: lazyLoad('ml.close_job', opts),
      closeJob: lazyLoad('ml.close_job', opts),
      delete_calendar: lazyLoad('ml.delete_calendar', opts),
      deleteCalendar: lazyLoad('ml.delete_calendar', opts),
      delete_calendar_event: lazyLoad('ml.delete_calendar_event', opts),
      deleteCalendarEvent: lazyLoad('ml.delete_calendar_event', opts),
      delete_calendar_job: lazyLoad('ml.delete_calendar_job', opts),
      deleteCalendarJob: lazyLoad('ml.delete_calendar_job', opts),
      delete_data_frame_analytics: lazyLoad('ml.delete_data_frame_analytics', opts),
      deleteDataFrameAnalytics: lazyLoad('ml.delete_data_frame_analytics', opts),
      delete_datafeed: lazyLoad('ml.delete_datafeed', opts),
      deleteDatafeed: lazyLoad('ml.delete_datafeed', opts),
      delete_expired_data: lazyLoad('ml.delete_expired_data', opts),
      deleteExpiredData: lazyLoad('ml.delete_expired_data', opts),
      delete_filter: lazyLoad('ml.delete_filter', opts),
      deleteFilter: lazyLoad('ml.delete_filter', opts),
      delete_forecast: lazyLoad('ml.delete_forecast', opts),
      deleteForecast: lazyLoad('ml.delete_forecast', opts),
      delete_job: lazyLoad('ml.delete_job', opts),
      deleteJob: lazyLoad('ml.delete_job', opts),
      delete_model_snapshot: lazyLoad('ml.delete_model_snapshot', opts),
      deleteModelSnapshot: lazyLoad('ml.delete_model_snapshot', opts),
      delete_trained_model: lazyLoad('ml.delete_trained_model', opts),
      deleteTrainedModel: lazyLoad('ml.delete_trained_model', opts),
      estimate_model_memory: lazyLoad('ml.estimate_model_memory', opts),
      estimateModelMemory: lazyLoad('ml.estimate_model_memory', opts),
      evaluate_data_frame: lazyLoad('ml.evaluate_data_frame', opts),
      evaluateDataFrame: lazyLoad('ml.evaluate_data_frame', opts),
      explain_data_frame_analytics: lazyLoad('ml.explain_data_frame_analytics', opts),
      explainDataFrameAnalytics: lazyLoad('ml.explain_data_frame_analytics', opts),
      find_file_structure: lazyLoad('ml.find_file_structure', opts),
      findFileStructure: lazyLoad('ml.find_file_structure', opts),
      flush_job: lazyLoad('ml.flush_job', opts),
      flushJob: lazyLoad('ml.flush_job', opts),
      forecast: lazyLoad('ml.forecast', opts),
      get_buckets: lazyLoad('ml.get_buckets', opts),
      getBuckets: lazyLoad('ml.get_buckets', opts),
      get_calendar_events: lazyLoad('ml.get_calendar_events', opts),
      getCalendarEvents: lazyLoad('ml.get_calendar_events', opts),
      get_calendars: lazyLoad('ml.get_calendars', opts),
      getCalendars: lazyLoad('ml.get_calendars', opts),
      get_categories: lazyLoad('ml.get_categories', opts),
      getCategories: lazyLoad('ml.get_categories', opts),
      get_data_frame_analytics: lazyLoad('ml.get_data_frame_analytics', opts),
      getDataFrameAnalytics: lazyLoad('ml.get_data_frame_analytics', opts),
      get_data_frame_analytics_stats: lazyLoad('ml.get_data_frame_analytics_stats', opts),
      getDataFrameAnalyticsStats: lazyLoad('ml.get_data_frame_analytics_stats', opts),
      get_datafeed_stats: lazyLoad('ml.get_datafeed_stats', opts),
      getDatafeedStats: lazyLoad('ml.get_datafeed_stats', opts),
      get_datafeeds: lazyLoad('ml.get_datafeeds', opts),
      getDatafeeds: lazyLoad('ml.get_datafeeds', opts),
      get_filters: lazyLoad('ml.get_filters', opts),
      getFilters: lazyLoad('ml.get_filters', opts),
      get_influencers: lazyLoad('ml.get_influencers', opts),
      getInfluencers: lazyLoad('ml.get_influencers', opts),
      get_job_stats: lazyLoad('ml.get_job_stats', opts),
      getJobStats: lazyLoad('ml.get_job_stats', opts),
      get_jobs: lazyLoad('ml.get_jobs', opts),
      getJobs: lazyLoad('ml.get_jobs', opts),
      get_model_snapshots: lazyLoad('ml.get_model_snapshots', opts),
      getModelSnapshots: lazyLoad('ml.get_model_snapshots', opts),
      get_overall_buckets: lazyLoad('ml.get_overall_buckets', opts),
      getOverallBuckets: lazyLoad('ml.get_overall_buckets', opts),
      get_records: lazyLoad('ml.get_records', opts),
      getRecords: lazyLoad('ml.get_records', opts),
      get_trained_models: lazyLoad('ml.get_trained_models', opts),
      getTrainedModels: lazyLoad('ml.get_trained_models', opts),
      get_trained_models_stats: lazyLoad('ml.get_trained_models_stats', opts),
      getTrainedModelsStats: lazyLoad('ml.get_trained_models_stats', opts),
      info: lazyLoad('ml.info', opts),
      open_job: lazyLoad('ml.open_job', opts),
      openJob: lazyLoad('ml.open_job', opts),
      post_calendar_events: lazyLoad('ml.post_calendar_events', opts),
      postCalendarEvents: lazyLoad('ml.post_calendar_events', opts),
      post_data: lazyLoad('ml.post_data', opts),
      postData: lazyLoad('ml.post_data', opts),
      preview_datafeed: lazyLoad('ml.preview_datafeed', opts),
      previewDatafeed: lazyLoad('ml.preview_datafeed', opts),
      put_calendar: lazyLoad('ml.put_calendar', opts),
      putCalendar: lazyLoad('ml.put_calendar', opts),
      put_calendar_job: lazyLoad('ml.put_calendar_job', opts),
      putCalendarJob: lazyLoad('ml.put_calendar_job', opts),
      put_data_frame_analytics: lazyLoad('ml.put_data_frame_analytics', opts),
      putDataFrameAnalytics: lazyLoad('ml.put_data_frame_analytics', opts),
      put_datafeed: lazyLoad('ml.put_datafeed', opts),
      putDatafeed: lazyLoad('ml.put_datafeed', opts),
      put_filter: lazyLoad('ml.put_filter', opts),
      putFilter: lazyLoad('ml.put_filter', opts),
      put_job: lazyLoad('ml.put_job', opts),
      putJob: lazyLoad('ml.put_job', opts),
      put_trained_model: lazyLoad('ml.put_trained_model', opts),
      putTrainedModel: lazyLoad('ml.put_trained_model', opts),
      revert_model_snapshot: lazyLoad('ml.revert_model_snapshot', opts),
      revertModelSnapshot: lazyLoad('ml.revert_model_snapshot', opts),
      set_upgrade_mode: lazyLoad('ml.set_upgrade_mode', opts),
      setUpgradeMode: lazyLoad('ml.set_upgrade_mode', opts),
      start_data_frame_analytics: lazyLoad('ml.start_data_frame_analytics', opts),
      startDataFrameAnalytics: lazyLoad('ml.start_data_frame_analytics', opts),
      start_datafeed: lazyLoad('ml.start_datafeed', opts),
      startDatafeed: lazyLoad('ml.start_datafeed', opts),
      stop_data_frame_analytics: lazyLoad('ml.stop_data_frame_analytics', opts),
      stopDataFrameAnalytics: lazyLoad('ml.stop_data_frame_analytics', opts),
      stop_datafeed: lazyLoad('ml.stop_datafeed', opts),
      stopDatafeed: lazyLoad('ml.stop_datafeed', opts),
      update_datafeed: lazyLoad('ml.update_datafeed', opts),
      updateDatafeed: lazyLoad('ml.update_datafeed', opts),
      update_filter: lazyLoad('ml.update_filter', opts),
      updateFilter: lazyLoad('ml.update_filter', opts),
      update_job: lazyLoad('ml.update_job', opts),
      updateJob: lazyLoad('ml.update_job', opts),
      update_model_snapshot: lazyLoad('ml.update_model_snapshot', opts),
      updateModelSnapshot: lazyLoad('ml.update_model_snapshot', opts),
      validate: lazyLoad('ml.validate', opts),
      validate_detector: lazyLoad('ml.validate_detector', opts),
      validateDetector: lazyLoad('ml.validate_detector', opts)
    },
    monitoring: {
      bulk: lazyLoad('monitoring.bulk', opts)
    },
    msearch: lazyLoad('msearch', opts),
    msearch_template: lazyLoad('msearch_template', opts),
    msearchTemplate: lazyLoad('msearch_template', opts),
    mtermvectors: lazyLoad('mtermvectors', opts),
    nodes: {
      hot_threads: lazyLoad('nodes.hot_threads', opts),
      hotThreads: lazyLoad('nodes.hot_threads', opts),
      info: lazyLoad('nodes.info', opts),
      reload_secure_settings: lazyLoad('nodes.reload_secure_settings', opts),
      reloadSecureSettings: lazyLoad('nodes.reload_secure_settings', opts),
      stats: lazyLoad('nodes.stats', opts),
      usage: lazyLoad('nodes.usage', opts)
    },
    ping: lazyLoad('ping', opts),
    put_script: lazyLoad('put_script', opts),
    putScript: lazyLoad('put_script', opts),
    rank_eval: lazyLoad('rank_eval', opts),
    rankEval: lazyLoad('rank_eval', opts),
    reindex: lazyLoad('reindex', opts),
    reindex_rethrottle: lazyLoad('reindex_rethrottle', opts),
    reindexRethrottle: lazyLoad('reindex_rethrottle', opts),
    render_search_template: lazyLoad('render_search_template', opts),
    renderSearchTemplate: lazyLoad('render_search_template', opts),
    rollup: {
      delete_job: lazyLoad('rollup.delete_job', opts),
      deleteJob: lazyLoad('rollup.delete_job', opts),
      get_jobs: lazyLoad('rollup.get_jobs', opts),
      getJobs: lazyLoad('rollup.get_jobs', opts),
      get_rollup_caps: lazyLoad('rollup.get_rollup_caps', opts),
      getRollupCaps: lazyLoad('rollup.get_rollup_caps', opts),
      get_rollup_index_caps: lazyLoad('rollup.get_rollup_index_caps', opts),
      getRollupIndexCaps: lazyLoad('rollup.get_rollup_index_caps', opts),
      put_job: lazyLoad('rollup.put_job', opts),
      putJob: lazyLoad('rollup.put_job', opts),
      rollup_search: lazyLoad('rollup.rollup_search', opts),
      rollupSearch: lazyLoad('rollup.rollup_search', opts),
      start_job: lazyLoad('rollup.start_job', opts),
      startJob: lazyLoad('rollup.start_job', opts),
      stop_job: lazyLoad('rollup.stop_job', opts),
      stopJob: lazyLoad('rollup.stop_job', opts)
    },
    scripts_painless_execute: lazyLoad('scripts_painless_execute', opts),
    scriptsPainlessExecute: lazyLoad('scripts_painless_execute', opts),
    scroll: lazyLoad('scroll', opts),
    search: lazyLoad('search', opts),
    search_shards: lazyLoad('search_shards', opts),
    searchShards: lazyLoad('search_shards', opts),
    search_template: lazyLoad('search_template', opts),
    searchTemplate: lazyLoad('search_template', opts),
    searchable_snapshots: {
      clear_cache: lazyLoad('searchable_snapshots.clear_cache', opts),
      clearCache: lazyLoad('searchable_snapshots.clear_cache', opts),
      mount: lazyLoad('searchable_snapshots.mount', opts),
      repository_stats: lazyLoad('searchable_snapshots.repository_stats', opts),
      repositoryStats: lazyLoad('searchable_snapshots.repository_stats', opts),
      stats: lazyLoad('searchable_snapshots.stats', opts)
    },
    searchableSnapshots: {
      clear_cache: lazyLoad('searchable_snapshots.clear_cache', opts),
      clearCache: lazyLoad('searchable_snapshots.clear_cache', opts),
      mount: lazyLoad('searchable_snapshots.mount', opts),
      repository_stats: lazyLoad('searchable_snapshots.repository_stats', opts),
      repositoryStats: lazyLoad('searchable_snapshots.repository_stats', opts),
      stats: lazyLoad('searchable_snapshots.stats', opts)
    },
    security: {
      authenticate: lazyLoad('security.authenticate', opts),
      change_password: lazyLoad('security.change_password', opts),
      changePassword: lazyLoad('security.change_password', opts),
      clear_cached_realms: lazyLoad('security.clear_cached_realms', opts),
      clearCachedRealms: lazyLoad('security.clear_cached_realms', opts),
      clear_cached_roles: lazyLoad('security.clear_cached_roles', opts),
      clearCachedRoles: lazyLoad('security.clear_cached_roles', opts),
      create_api_key: lazyLoad('security.create_api_key', opts),
      createApiKey: lazyLoad('security.create_api_key', opts),
      delete_privileges: lazyLoad('security.delete_privileges', opts),
      deletePrivileges: lazyLoad('security.delete_privileges', opts),
      delete_role: lazyLoad('security.delete_role', opts),
      deleteRole: lazyLoad('security.delete_role', opts),
      delete_role_mapping: lazyLoad('security.delete_role_mapping', opts),
      deleteRoleMapping: lazyLoad('security.delete_role_mapping', opts),
      delete_user: lazyLoad('security.delete_user', opts),
      deleteUser: lazyLoad('security.delete_user', opts),
      disable_user: lazyLoad('security.disable_user', opts),
      disableUser: lazyLoad('security.disable_user', opts),
      enable_user: lazyLoad('security.enable_user', opts),
      enableUser: lazyLoad('security.enable_user', opts),
      get_api_key: lazyLoad('security.get_api_key', opts),
      getApiKey: lazyLoad('security.get_api_key', opts),
      get_builtin_privileges: lazyLoad('security.get_builtin_privileges', opts),
      getBuiltinPrivileges: lazyLoad('security.get_builtin_privileges', opts),
      get_privileges: lazyLoad('security.get_privileges', opts),
      getPrivileges: lazyLoad('security.get_privileges', opts),
      get_role: lazyLoad('security.get_role', opts),
      getRole: lazyLoad('security.get_role', opts),
      get_role_mapping: lazyLoad('security.get_role_mapping', opts),
      getRoleMapping: lazyLoad('security.get_role_mapping', opts),
      get_token: lazyLoad('security.get_token', opts),
      getToken: lazyLoad('security.get_token', opts),
      get_user: lazyLoad('security.get_user', opts),
      getUser: lazyLoad('security.get_user', opts),
      get_user_privileges: lazyLoad('security.get_user_privileges', opts),
      getUserPrivileges: lazyLoad('security.get_user_privileges', opts),
      has_privileges: lazyLoad('security.has_privileges', opts),
      hasPrivileges: lazyLoad('security.has_privileges', opts),
      invalidate_api_key: lazyLoad('security.invalidate_api_key', opts),
      invalidateApiKey: lazyLoad('security.invalidate_api_key', opts),
      invalidate_token: lazyLoad('security.invalidate_token', opts),
      invalidateToken: lazyLoad('security.invalidate_token', opts),
      put_privileges: lazyLoad('security.put_privileges', opts),
      putPrivileges: lazyLoad('security.put_privileges', opts),
      put_role: lazyLoad('security.put_role', opts),
      putRole: lazyLoad('security.put_role', opts),
      put_role_mapping: lazyLoad('security.put_role_mapping', opts),
      putRoleMapping: lazyLoad('security.put_role_mapping', opts),
      put_user: lazyLoad('security.put_user', opts),
      putUser: lazyLoad('security.put_user', opts)
    },
    slm: {
      delete_lifecycle: lazyLoad('slm.delete_lifecycle', opts),
      deleteLifecycle: lazyLoad('slm.delete_lifecycle', opts),
      execute_lifecycle: lazyLoad('slm.execute_lifecycle', opts),
      executeLifecycle: lazyLoad('slm.execute_lifecycle', opts),
      execute_retention: lazyLoad('slm.execute_retention', opts),
      executeRetention: lazyLoad('slm.execute_retention', opts),
      get_lifecycle: lazyLoad('slm.get_lifecycle', opts),
      getLifecycle: lazyLoad('slm.get_lifecycle', opts),
      get_stats: lazyLoad('slm.get_stats', opts),
      getStats: lazyLoad('slm.get_stats', opts),
      get_status: lazyLoad('slm.get_status', opts),
      getStatus: lazyLoad('slm.get_status', opts),
      put_lifecycle: lazyLoad('slm.put_lifecycle', opts),
      putLifecycle: lazyLoad('slm.put_lifecycle', opts),
      start: lazyLoad('slm.start', opts),
      stop: lazyLoad('slm.stop', opts)
    },
    snapshot: {
      cleanup_repository: lazyLoad('snapshot.cleanup_repository', opts),
      cleanupRepository: lazyLoad('snapshot.cleanup_repository', opts),
      create: lazyLoad('snapshot.create', opts),
      create_repository: lazyLoad('snapshot.create_repository', opts),
      createRepository: lazyLoad('snapshot.create_repository', opts),
      delete: lazyLoad('snapshot.delete', opts),
      delete_repository: lazyLoad('snapshot.delete_repository', opts),
      deleteRepository: lazyLoad('snapshot.delete_repository', opts),
      get: lazyLoad('snapshot.get', opts),
      get_repository: lazyLoad('snapshot.get_repository', opts),
      getRepository: lazyLoad('snapshot.get_repository', opts),
      restore: lazyLoad('snapshot.restore', opts),
      status: lazyLoad('snapshot.status', opts),
      verify_repository: lazyLoad('snapshot.verify_repository', opts),
      verifyRepository: lazyLoad('snapshot.verify_repository', opts)
    },
    sql: {
      clear_cursor: lazyLoad('sql.clear_cursor', opts),
      clearCursor: lazyLoad('sql.clear_cursor', opts),
      query: lazyLoad('sql.query', opts),
      translate: lazyLoad('sql.translate', opts)
    },
    ssl: {
      certificates: lazyLoad('ssl.certificates', opts)
    },
    tasks: {
      cancel: lazyLoad('tasks.cancel', opts),
      get: lazyLoad('tasks.get', opts),
      list: lazyLoad('tasks.list', opts)
    },
    termvectors: lazyLoad('termvectors', opts),
    transform: {
      delete_transform: lazyLoad('transform.delete_transform', opts),
      deleteTransform: lazyLoad('transform.delete_transform', opts),
      get_transform: lazyLoad('transform.get_transform', opts),
      getTransform: lazyLoad('transform.get_transform', opts),
      get_transform_stats: lazyLoad('transform.get_transform_stats', opts),
      getTransformStats: lazyLoad('transform.get_transform_stats', opts),
      preview_transform: lazyLoad('transform.preview_transform', opts),
      previewTransform: lazyLoad('transform.preview_transform', opts),
      put_transform: lazyLoad('transform.put_transform', opts),
      putTransform: lazyLoad('transform.put_transform', opts),
      start_transform: lazyLoad('transform.start_transform', opts),
      startTransform: lazyLoad('transform.start_transform', opts),
      stop_transform: lazyLoad('transform.stop_transform', opts),
      stopTransform: lazyLoad('transform.stop_transform', opts),
      update_transform: lazyLoad('transform.update_transform', opts),
      updateTransform: lazyLoad('transform.update_transform', opts)
    },
    update: lazyLoad('update', opts),
    update_by_query: lazyLoad('update_by_query', opts),
    updateByQuery: lazyLoad('update_by_query', opts),
    update_by_query_rethrottle: lazyLoad('update_by_query_rethrottle', opts),
    updateByQueryRethrottle: lazyLoad('update_by_query_rethrottle', opts),
    watcher: {
      ack_watch: lazyLoad('watcher.ack_watch', opts),
      ackWatch: lazyLoad('watcher.ack_watch', opts),
      activate_watch: lazyLoad('watcher.activate_watch', opts),
      activateWatch: lazyLoad('watcher.activate_watch', opts),
      deactivate_watch: lazyLoad('watcher.deactivate_watch', opts),
      deactivateWatch: lazyLoad('watcher.deactivate_watch', opts),
      delete_watch: lazyLoad('watcher.delete_watch', opts),
      deleteWatch: lazyLoad('watcher.delete_watch', opts),
      execute_watch: lazyLoad('watcher.execute_watch', opts),
      executeWatch: lazyLoad('watcher.execute_watch', opts),
      get_watch: lazyLoad('watcher.get_watch', opts),
      getWatch: lazyLoad('watcher.get_watch', opts),
      put_watch: lazyLoad('watcher.put_watch', opts),
      putWatch: lazyLoad('watcher.put_watch', opts),
      start: lazyLoad('watcher.start', opts),
      stats: lazyLoad('watcher.stats', opts),
      stop: lazyLoad('watcher.stop', opts)
    },
    xpack: {
      info: lazyLoad('xpack.info', opts),
      usage: lazyLoad('xpack.usage', opts)
    }
  }

  return apis

  function handleError (err, callback) {
    if (callback) return callback(err, result)
    return Promise.reject(err)
  }

  function snakeCaseKeys (acceptedQuerystring, snakeCase, querystring, warnings) {
    var target = {}
    var keys = Object.keys(querystring)
    for (var i = 0, len = keys.length; i < len; i++) {
      var key = keys[i]
      target[snakeCase[key] || key] = querystring[key]
      if (acceptedQuerystring.indexOf(snakeCase[key] || key) === -1) {
        warnings.push('Client - Unknown parameter: "' + key + '", sending it as query parameter')
      }
    }
    return target
  }
}

// It's unlikely that a user needs all of our APIs,
// and since require is a sync operation that takes time
// (given the amount of APIs we have), let's lazy load them,
// so a given API file will be required only
// if the user actually needs that API.
// The following implementation takes advantage
// of js closures to have a simple cache with the least overhead.
function lazyLoad (file, opts) {
  var fn = null
  return function _lazyLoad (params, options, callback) {
    if (fn === null) {
      fn = require(`./api/${file}.js`)(opts)
    }
    return fn(params, options, callback)
  }
}

module.exports = ESAPI
