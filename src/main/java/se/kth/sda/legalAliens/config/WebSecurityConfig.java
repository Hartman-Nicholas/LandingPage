package se.kth.sda.legalAliens.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import se.kth.sda.legalAliens.auth.CustomUserDetailsService;
import se.kth.sda.legalAliens.auth.JWTAuthFilter;
import se.kth.sda.legalAliens.auth.JWTEncoderDecoder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Scope("singleton")
    public JWTEncoderDecoder jwtEncoderDecoder() throws JWTEncoderDecoder.InitializationException {
        return new JWTEncoderDecoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Disable cors, csrf for Stateless service handling
        http.cors().disable().csrf().disable().sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        // Whitelist
        http.authorizeRequests()
                .antMatchers("/authenticate", "/register", "/register/{userName}", "/register/email/{email}")
                .permitAll().antMatchers(HttpMethod.OPTIONS, "/**").permitAll().anyRequest().authenticated();

        // Register filters
        http.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return authenticationManager();
    }

    @Autowired
    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
    }
}
