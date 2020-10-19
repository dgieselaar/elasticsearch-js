import { SearchRequestBody, SearchApiResponse } from './types/search-api-response';
import { TransportRequestPromise } from '../lib/Transport';
import { KibanaClient } from '../api/kibana';

const client:KibanaClient = {} as any;

async function run ( ) {

  let fieldToBucket;
  const JOB_ID = '';
  const PARTITION_FIELD_VALUE = '';

  const response = await client.search({
    // index: ML_RESULTS_INDEX_PATTERN,
    // size: 0,
    body: {
      // query: {
      //   bool: {
      //     must: mustMatchClauses,
      //     filter: [
      //       {
      //         terms: {
      //           job_id: jobIdsWithStopOnWarnSet,
      //         },
      //       },
      //     ],
      //   },
      // },
      aggregations:
        fieldToBucket === JOB_ID
          ? // if bucketing by job_id, then return list of job_ids with at least one stopped_partitions
            {
              unique_terms: {
                terms: {
                  field: JOB_ID,
                },
              },
            }
          : // if bucketing by partition field value, then return list of unique stopped_partitions for each job
            {
              jobs: {
                terms: {
                  field: JOB_ID,
                },
                aggs: {
                  unique_stopped_partitions: {
                    terms: {
                      field: PARTITION_FIELD_VALUE,
                    },
                  },
                },
              },
            },
    },
  });

}
