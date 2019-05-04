import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { from } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';

const uri = 'https://api.github.com/graphql';
export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri });

  const auth = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return {};
    } else {
      return {
        headers: new HttpHeaders().append('Authorization', `Bearer ${token}`)
      };
    }
  });

  return {
    link: from([auth, http]),
    cache: new InMemoryCache()
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ]
})
export class GraphQLModule {}
